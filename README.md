# Openmesh Cloud Stack Visualizer

An interactive visualization of the Openmesh Cloud infrastructure and resource allocation system. View the live demo at [https://johnforfar.github.io/openmesh-cloud-visualizer/](https://johnforfar.github.io/openmesh-cloud-visualizer/)

## About Openmesh Cloud

Openmesh Cloud is a decentralized infrastructure platform that enables peer-to-peer resource sharing and consumption. The system allows users to rent out their compute and storage resources to the network, while others can consume these resources through a decentralized marketplace.

To learn more about Openmesh and its innovative decentralized cloud infrastructure, visit [https://openmesh.network/](https://openmesh.network/)

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Local Development

First, run the development server:

npm install
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployment

This project is deployed on GitHub Pages. The deployment process is automated using GitHub Actions, which builds and deploys the application to the gh-pages branch whenever changes are pushed to the main branch.

To deploy manually:

npm run deploy


## Technology Stack

- Framework: Next.js 13 with App Router
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- Icons: Lucide React
- Deployment: GitHub Pages

## Learn More

To learn more about Next.js, take a look at the following resources:

- Next.js Documentation - learn about Next.js features and API.
- Learn Next.js - an interactive Next.js tutorial.

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## Features

- Interactive visualization of the Openmesh Cloud Stack
- Real-time resource allocation visualization
- Configurable node count and allocation percentage
- Responsive design for both desktop and mobile devices
- Dark mode support
- SVG-based visualization with dynamic scaling
- Real-time updates of system resources based on configuration changes

## Documentation

The visualization consists of three main layers:

- Openmesh Cloud Layer - The top ring showing resource allocation
- Virtual Machine Layer - The middle layer displaying active VMs
- XNode Infrastructure - The bottom layer showing physical nodes

Resources are calculated based on:

- Number of XNodes (configurable from 10-100)
- Resource allocation percentage (1-100%)
- Per-node resources (8 vCPU, 16GB RAM, 320GB Storage)

## Maintenance

This project uses GitHub Actions for automated deployments. The workflow is configured in `.github/workflows/deploy.yml`. Any push to the main branch triggers a new deployment to GitHub Pages.

## License

MIT License - feel free to use this project for your own purposes.