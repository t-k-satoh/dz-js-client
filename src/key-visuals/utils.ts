import { ResponseKeyVisual, ResultKeyVisual } from './types';

export const snakeToCamel = (keyVisual: ResponseKeyVisual): ResultKeyVisual => ({
    keyVisualId: keyVisual.key_visual_id,
    name: keyVisual.name,
    caption: keyVisual.caption,
    imageId: keyVisual.image_id,
    url: keyVisual.url,
    createdAt: keyVisual.created_at,
    updatedAt: keyVisual.updated_at,
    product: keyVisual.product,
});
