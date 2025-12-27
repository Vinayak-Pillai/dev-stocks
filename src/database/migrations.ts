// import { migrate } from 'drizzle-orm/neon-serverless/migrator';
// import { db } from './database.module';

// async function runMigrations() {
//   try {
//     console.log('Running migrations...');
//     await migrate(db, { migrationsFolder: 'drizzle' });
//     console.log('✅ Migrations completed');
//   } catch (err) {
//     console.error('❌ Migration failed:', err);
//     process.exit(1);
//   } finally {
//     process.exit(0);
//   }
// }

function runMigrations() {
  console.log('Migrations run test');
}
runMigrations();
