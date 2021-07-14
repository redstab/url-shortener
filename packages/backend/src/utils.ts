import parser from 'ua-parser-js';
import { Request } from 'express';
import geoip from 'geoip-lite';

export const RateLimitKey = (req: Request): string => {
  const {
    os,
    browser: { name, version },
    cpu: { architecture },
  } = parser(req.headers['user-agent']);

  const { ip } = req;

  const { country, city } = geoip.lookup(ip) ?? {
    country: 'unknown',
    city: 'unknown',
  };

  return `RateLimit:${ip}:${country}-${city}:${name}-${version}:${os.name}-${os.version}:${architecture}`;
};
