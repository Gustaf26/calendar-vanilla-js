import initSqlJs from 'sql.js';


const loadDb = async () => {
    const SQL = await initSqlJs({
        locateFile: file => `https://sql.js.org/dist/${file}`
    });

    const response = await fetch('/db/mycontacts.db');
    const buffer = await response.arrayBuffer();
    const db = new SQL.Database(new Uint8Array(buffer));


    return db
    // // Skapa tabell
    // db.run("CREATE TABLE kalender (id INTEGER PRIMARY KEY, datum TEXT, titel TEXT)");

    // // Lägg till en händelse
    // db.run("INSERT INTO kalender (datum, titel) VALUES (?, ?)", ['2025-06-27', 'Glass i solen']);;
};

export { loadDb }

