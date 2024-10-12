'use client';

import React, { FC } from 'react';
import { Dropdown } from "@/components/ui/dropdown";

interface Funcion {
    format: string;
    type: string;
    language: string;
    schedules: string[];
}

interface CineDropdownProps {
    cine: string;
    funciones: Funcion[];
}

export const CineDropdown: FC<CineDropdownProps> = ({ cine, funciones }) => {
    return (
        <Dropdown title={cine}>
            {funciones.map((funcion, index) => (
                <div key={index} className="mb-4 border border-gray-200 rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-sm bg-gray-100 px-2 py-1 rounded">{funcion.format}</span>
                        <span className="text-sm">{funcion.type}</span>
                        <span className="text-sm">{funcion.language}</span>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        {funcion.schedules.map((horario, idx) => (
                            <span key={idx} className="px-4 py-2 bg-blue-100 text-blue-900 rounded-md cursor-pointer hover:bg-blue-200">
                                {horario}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </Dropdown>
    );
};
