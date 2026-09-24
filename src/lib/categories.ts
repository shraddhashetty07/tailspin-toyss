/**
 * Category lookup helpers for the Tailspin Toys catalog.
 *
 * These queries keep category access in one place and return strongly typed
 * records for the static Astro pages.
 */
import { asc } from 'drizzle-orm';
import { categories } from '../../db/schema';
import type { Category } from '../types/game';
import type { Database } from './db';

/**
 * Returns all categories in the catalog sorted alphabetically by name.
 *
 * @param db - Database connection used to read the categories table.
 * @returns A promise resolving to every category record in name order.
 */
export async function getAllCategories(db: Database): Promise<Category[]> {
    const rows = await db
        .select({
            id: categories.id,
            name: categories.name,
        })
        .from(categories)
        .orderBy(asc(categories.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
