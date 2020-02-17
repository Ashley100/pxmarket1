export default {
    state: {
        products: [
            {
                'p_id': 'bag_1',
                'p_title': 'Рюкзак Fjallraven Kanken',
                'p_url': 'product/bag_1',
                'p_img': 'http://bagyou.ru/wa-data/public/shop/products/57/11/11157/images/13540/13540.970.jpg',
                'p_description': 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
                'price': '1233'
            },
            {
                'p_id': 'bag_2',
                'p_title': 'Рюкзак Fjallraven Kanken',
                'p_url': 'product/bag_2',
                'p_img': 'http://bagyou.ru/wa-data/public/shop/products/58/11/11158/images/13541/13541.970.jpg',
                'p_description': 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
                'price': '3221'
            },
            {
                'p_id': 'ryukzak-zain-zn-050',
                'p_title': 'Рюкзак Zain',
                'p_url': 'product/ryukzak-zain-zn-050',
                'p_img': 'http://bagyou.ru/wa-data/public/shop/products/68/11/11168/images/13545/13545.970.jpg',
                'p_description': 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
                'price': '2099'
            },
            {
                'p_id': 'ryukzak-zh-042',
                'p_title': 'Рюкзак Ж-042',
                'p_url': 'product/ryukzak-zh-042',
                'p_img': 'http://bagyou.ru/wa-data/public/shop/products/78/11/11178/images/13554/13554.970.jpg',
                'p_description': 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
                'price': '1999'
            },
            {
                'p_id': 'termos-ts-110',
                'p_title': 'Термос ТС-110',
                'p_url': 'product/termos-ts-110',
                'p_img': 'http://bagyou.ru/wa-data/public/shop/products/14/07/10714/images/13057/13057.970.jpg',
                'p_description': 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
                'price': '2899'
            },
            {
                'p_id': 'kruzhka-u-191',
                'p_title': 'Кружка У-191',
                'p_url': 'product/kruzhka-u-191',
                'p_img': 'http://bagyou.ru/wa-data/public/shop/products/40/08/10840/images/13185/13185.970.jpg',
                'p_description': 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
                'price': '1332'
            }
        ]
    },
    mutations: {},
    actions: {},
    getters: {
        products (state) {
            return state.products
        }
    }
}