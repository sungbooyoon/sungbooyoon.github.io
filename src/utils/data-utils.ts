import { type CollectionEntry } from 'astro:content';
import { slugify } from './common-utils';

export function sortItemsByDateDesc(itemA: CollectionEntry<'blog' | 'projects'>, itemB: CollectionEntry<'blog' | 'projects'>) {
    return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}

export type TaggableEntry = CollectionEntry<'blog'> | CollectionEntry<'projects'>;

export function getAllTags(items: TaggableEntry[]) {
    const tags: string[] = [...new Set(items.flatMap((item) => item.data.tags || []).filter(Boolean))];
    return tags
        .map((tag) => {
            return {
                name: tag,
                id: slugify(tag)
            };
        })
        .filter((obj, pos, arr) => {
            return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
        });
}

export function getItemsByTag(items: TaggableEntry[], tagId: string) {
    return items.filter((item) => (item.data.tags || []).map((tag) => slugify(tag)).includes(tagId));
}
