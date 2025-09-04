export interface ServerConfig {
  maxBodySize: number;
}

export const serverConfig: ServerConfig = {
  maxBodySize: 10240, // 10 KB
};
