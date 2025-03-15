import { UserContentAccessModel } from '@domain/lib/user-management';
import { UserContentAccessDto } from '../../dto';
import { Mapper } from '../../misc';


export class UserContentAccessMapper implements Mapper<UserContentAccessModel, UserContentAccessDto> {
    mapFrom(param: UserContentAccessModel): UserContentAccessDto {
        const property = `${param.label}`;
        const obj = {};
        // @ts-ignore
        obj[property] = param.idList;
        return {
            ...obj,
            userRoleId: param.userRoleId,
            accessScope: param.selectionMode == 'all' ? 'ALL' : param.selectionMode == 'some' ? 'INCLUDE' : undefined
        };
    }

    mapTo(param: UserContentAccessDto): UserContentAccessModel {
        let label;
        let idList;
        let saveUrl;
        let getByUserRoleIdUrl;
        let getCategoryUrl;
        if (param.hasOwnProperty('goodsServiceCategories')) {
            label = 'goodsServiceCategories';
            idList = param.goodsServiceCategories;
            getCategoryUrl = 'goods-service-categories/search/active-leaves';
            saveUrl = 'category-accesses/define';
            getByUserRoleIdUrl = 'category-accesses/get/user-role';
        } else if (param.hasOwnProperty('organizations')) {
            label = 'organizations';
            idList = param.organizations;
            getCategoryUrl = 'organizations/search/actives';
            saveUrl = 'organization-accesses/define';
            getByUserRoleIdUrl = 'organization-accesses/get/user-role';
        } else if (param.hasOwnProperty('inventories')) {
            label = 'inventories';
            idList = param.inventories;
            getCategoryUrl = 'inventories/search/actives';
            saveUrl = 'inventory-accesses/define';
            getByUserRoleIdUrl = 'inventory-accesses/get/user-role';
        } else if (param.hasOwnProperty('personCompanies')) {
            label = 'personCompanies';
            idList = param.personCompanies;
            getCategoryUrl = 'prs-corps/search/actives';
            saveUrl = 'prs-corps-accesses/define';
            getByUserRoleIdUrl = 'prs-corps-accesses/get/user-role';
        }

        return {
            label: label,
            saveUrl: saveUrl,
            getByUserRoleIdUrl: getByUserRoleIdUrl,
            getCategoryUrl: getCategoryUrl,
            userRoleId: param.userRoleId,
            selectionMode: param.accessScope == 'ALL' ? 'all' : param.accessScope == 'INCLUDE' ? 'some' : 'none',
            idList: idList
        };
    }

}
