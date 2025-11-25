import { Database } from '@sqlitecloud/drivers'

const loadDb = async () => {
    // npm install @sqlitecloud/drivers

    const db = new Database(`sqlitecloud://clbljk0pnk.g1.sqlite.cloud:8860/chinook.sqlite?apikey=${import.meta.env.VITE_API_KEY}`);

    return db
};

export { loadDb }

