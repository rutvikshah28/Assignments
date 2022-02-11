/*
    Part 2 - Nest
    At this point my goto reference in yd-backend has become the faqs section.
    I tried to implement fp-ts pipe as a means to compute the updateFaq function.
    This implementation certainly shortned it and made it easier to understand.

    The path of this is: heyauto/packages/yd-backend/src/faqs/gaqs.service.ts

*/

import { pipe } from 'fp-ts/function';

async updateFaq(inputFaq: InputFAQ) {
    if (!inputFaq.id) {
        throw new NotFoundException("FAQ ID required for update");
    }
    return pipe(
        await this.faqsRepository.findOne({
            where: { id: inputFaq.id }
        }),
        (a) => {
            if(!a){
                throw new NotFoundException("Faq not found");
            }
            return a;
        },
        async (b) => await b.update({
            ...inputFaq,
            url: this.faqSlug(inputFaq.question)
        }),
        (c) => c.then(update => convertToHaAdminFAQ(update))
        );
}