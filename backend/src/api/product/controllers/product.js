'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
    async find(ctx) {

        const entries = await strapi.entityService.findMany('api::product.product', {
            populate: '*',
        })
        ctx.body = entries
    },

    async findOne(ctx) {
        const id = ctx.params.id

        const entries = await strapi.entityService.findOne('api::product.product', id, {
            populate: ['pictures', 'thumbnail', 'reviews.author'],
        })
        ctx.body = entries
    },

    async review(ctx) {
        const entry = await strapi.entityService.create('api::review.review', {
            populate: '*',
            data: {
                review: ctx.request.body.data.review,
                author: ctx.state.user.id,
                product: ctx.params.id
            },
        });
        const sanitizedEntity = await this.sanitizeOutput(entry, ctx);
        return this.transformResponse(sanitizedEntity);
    }
}));
