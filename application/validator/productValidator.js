
const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");

class productValidator {
    validateProductData = () => {
        return[
            body('nombre').notEmpty().isString().withMessage('El nombre es obligatorio'),
            body('tipo').notEmpty().isString().withMessage('El tipo es obligatorio'),
            body('cantidad').notEmpty().isNumeric().withMessage('La cantidad es obligatoria'),
            body('Precio').notEmpty().isNumeric().withMessage('El precio es obligatorio'),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })]

    }

    validateProductDataEmpty= () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateProductId= () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    validateProductUpdateDataById= () => {
        return [   
            body('nombre').notEmpty().isString().withMessage('El nombre es obligatorio'),
            body('tipo').notEmpty().isString().withMessage('El tipo es obligatorio'),
            body('cantidad').notEmpty().isNumeric().withMessage('La cantidad es obligatoria'),
            body('Precio').notEmpty().isNumeric().withMessage('El precio es obligatorio'),
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };
}

module.exports = productValidator