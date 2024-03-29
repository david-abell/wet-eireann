import { useQuery } from "react-query";
import { XMLParser } from "fast-xml-parser";

function useWarnings() {
  const fetchWarnings = async () => {
    const RSS_API_URL = "https://www.met.ie/warningsxml/rss.xml";
    const parser = new XMLParser({
      attributeNamePrefix: "",
      ignoreAttributes: false,
      ignoreNameSpace: false,
    });
    const headers = new Headers();
    headers.set("content-type", "text/xml");
    headers.set("X-Requested-With", "XMLHttpRequest");

    const rssUrl = `${process.env.REACT_APP_CORS_PROXY}${RSS_API_URL}`;
    const response = await fetch(rssUrl, {
      mode: "cors",
      headers: headers,
      redirect: "error",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.text();
    const alerts = parser.parse(result)?.rss?.channel?.item || [];
    let links = [];
    if (Array.isArray(alerts) && alerts.length) {
      links = alerts.map((el) => {
        return el.link;
      });
    }
    if (alerts?.link) {
      links.push(alerts.link);
    }
    let warnings;
    if (links.length) {
      warnings = await Promise.all(
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
    }

    return warnings;
  };

  const { isLoading, error, data, isFetching } = useQuery(
    "warnings",
    fetchWarnings,
    { staleTime: 120000 }
  );

  return {
    data: data ?? [],
    isLoading,
    error,
    isFetching,
  };
}

export default useWarnings;
