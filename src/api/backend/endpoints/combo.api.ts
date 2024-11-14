import { Combo } from '@/interfaces/models/combo.interface';
import instance from './base.api';

export const comboApi = {
    addCombo: function (combo: Omit<Combo, 'id'>) {
        return instance.post('combo/create', combo);
    },
    deleteCombo: function (id: number) {
        return instance.delete(`combo/delete/${id}`);
    },
    updateCombo: function (id: number, comboData: Partial<Combo>) {
        return instance.patch(`combo/update/${id}`, comboData);
    },
    getCombo: function(){
        return instance.get('combo/getAll')
    }
}