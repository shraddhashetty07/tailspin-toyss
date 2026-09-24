/**
 * Publisher lookup helpers for the Tailspin Toys catalog.
 *
 * These queries keep database access in one place and return strongly typed
 * publisher records for the static Astro pages.
 */
import { asc } from 'drizzle-orm';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';
import type { Database } from './db';

/**
 * Returns all publishers in the catalog sorted alphabetically by name.
 *
 * @param db - Database connection used to read the publishers table.
 * @returns A promise resolving to every publisher record in name order.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
