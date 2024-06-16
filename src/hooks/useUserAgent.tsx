import { useEffect, useState } from "react";

const parseUserAgent = (userAgent: string) => {
  const os = { name: "", version: "" };
  if (/Windows NT 10.0/.test(userAgent)) {
    os.name = "Windows";
    os.version = "10";
  } else if (/Windows NT 6.3/.test(userAgent)) {
    os.name = "Windows";
    os.version = "8.1";
  } else if (/Windows NT 6.2/.test(userAgent)) {
    os.name = "Windows";
    os.version = "8";
  } else if (/Windows NT 6.1/.test(userAgent)) {
    os.name = "Windows";
    os.version = "7";
  } else if (/Mac OS X (\d+)[._](\d+)/.test(userAgent)) {
    const match = userAgent.match(/Mac OS X (\d+)[._](\d+)/);
    os.name = "Mac OS";
    os.version = `${match[1]}.${match[2]}`;
  } else if (/Android (\d+)[._](\d+)/.test(userAgent)) {
    const match = userAgent.match(/Android (\d+)[._](\d+)/);
    os.name = "Android";
    os.version = `${match[1]}.${match[2]}`;
  } else if (/iPhone OS (\d+)[._](\d+)/.test(userAgent)) {
    const match = userAgent.match(/iPhone OS (\d+)[._](\d+)/);
    os.name = "iOS";
    os.version = `${match[1]}.${match[2]}`;
  } else if (/Linux/.test(userAgent)) {
    os.name = "Linux";
  }
  return os;
};

const useUserAgent = (userAgentString: any) => {
  const [os, setOs] = useState({ name: "", version: "" });

  useEffect(() => {
    setOs(parseUserAgent(userAgentString));
  }, [userAgentString]);

  return os;
};

export default useUserAgent;
