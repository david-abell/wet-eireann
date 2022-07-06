import { useQuery } from "react-query";
import { XMLParser } from "fast-xml-parser";

function useWarnings() {
  const fetchWarnings = async () => {
    const parser = new XMLParser({
      attributeNamePrefix: "",
      ignoreAttributes: false,
      ignoreNameSpace: false,
    });
    const headers = new Headers();
    headers.set("content-type", "text/xml");
    headers.set("X-Requested-With", "XMLHttpRequest");

    const rssUrl = `${process.env.REACT_APP_CORS_PROXY}https://www.met.ie/warningsxml/rss.xml`;
    const response = await fetch(rssUrl, {
      mode: "cors",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.text();
    const alerts = parser.parse(result)?.rss?.channel?.item;
    const links = alerts.map((el) => el.link);
    const warnings = await Promise.all(
      links.map(async (url) => {
        const linkResponse = await fetch(
          `${process.env.REACT_APP_CORS_PROXY}${url}`,
          {
            mode: "cors",
            headers: headers,
          }
        );
        if (!linkResponse.ok) {
          throw new Error(response.statusText);
        }
        const linkResult = await linkResponse.text();
        return parser.parse(linkResult).alert.info;
      })
    );

    return warnings;
  };

  const { isLoading, error, data, isFetching } = useQuery(
    "warnings",
    fetchWarnings
  );

  return {
    data: data ?? [],
    isLoading,
    error,
    isFetching,
  };
}

export default useWarnings;
