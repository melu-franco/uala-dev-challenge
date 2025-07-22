import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("metrics", "./routes/metrics.tsx"),
] satisfies RouteConfig;
