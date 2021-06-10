"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const class_validator_1 = require("class-validator");
class Model {
    static getModel(model, body, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const m2 = new model(body, query);
                const errors = yield class_validator_1.validate(m2);
                if (errors.length) {
                    throw errors;
                }
                return m2;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Model = Model;
//# sourceMappingURL=model.js.map