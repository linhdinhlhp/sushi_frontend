"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultACLObj = exports.buildAbilityFor = exports.AppAbility = void 0;
const ability_1 = require("@casl/ability");
exports.AppAbility = ability_1.Ability;
/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (permissions) => {
    const { can, rules } = new ability_1.AbilityBuilder(exports.AppAbility);
    if (permissions) {
        permissions.forEach((permission) => {
            can([permission.action], permission.subject);
        });
    }
    else {
        can(['read'], 'account-settings'); // Default role to read essentials pages
    }
    return rules;
};
const buildAbilityFor = (permissions) => {
    return new exports.AppAbility(defineRulesFor(permissions), {
        // https://casl.js.org/v5/en/guide/subject-type-detection
        // @ts-ignore
        detectSubjectType: object => object.type
    });
};
exports.buildAbilityFor = buildAbilityFor;
exports.defaultACLObj = {
    action: 'read',
    subject: 'account-settings'
};
exports.default = defineRulesFor;
