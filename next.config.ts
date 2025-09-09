// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin();
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
    }
};

export default withNextIntl(nextConfig);
