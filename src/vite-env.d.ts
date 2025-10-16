/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_FONNTE_TOKEN: string;
	readonly VITE_ADMIN_WA: string;
	readonly VITE_APP_NAME: string;
	readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
