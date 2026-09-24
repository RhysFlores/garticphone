// Set this to your repo name so assets resolve correctly at
// https://<your-username>.github.io/<repo-name>/
const REPO_NAME = 'garlicphone'
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const basePath = isGithubPages ? `/${REPO_NAME}` : ''

module.exports = {
  future: {
    webpack5: true,
  },
  basePath,
  assetPrefix: isGithubPages ? `/${REPO_NAME}/` : '',
  images: {
    unoptimized: true,
  },
  env: {
    // Exposed to the client so pages/404.tsx and pages/_app.tsx can build
    // correct URLs without hardcoding the repo name in multiple places.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  webpack(config, { dev, isServer }) {
    /*
      https://santosnicolas.com/notes/next-js-optimized-with-preact
    */
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
}
