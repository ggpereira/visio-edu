import { App } from './app';
import { connect } from './database/database';

async function main() {
    const app = new App();
    await app.listen();
}


connect().then(async connection => {
    main();
})
