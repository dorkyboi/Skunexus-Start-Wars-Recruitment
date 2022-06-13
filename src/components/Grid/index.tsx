import './Grid.css';
import {ReactNode} from "react";

interface Props<T> {
    header: Extract<keyof T, string>[],
    values: T[],
    actions?: {
        label: string,
        action: (item: T) => any,
        visible?: boolean | ((item: T) => boolean),
    }[],
    cellRenderers?: {
        [key in keyof T]?: ({item, index, column}: {item: T, index: number, column: Extract<keyof T, string>}) => ReactNode
    },
    keyExtractor?: Extract<keyof T, string> | ((item: T) => string),
    hideActions?: boolean,
}

function Grid<T extends {[key: string]: any}>({
    header = [],
    values = [],
    actions = [],
    keyExtractor,
    hideActions,
    cellRenderers = {},
}: Props<T>) {
    return (
        <table className='gridTable'>
            <thead>
                <tr>
                    {header.map(colName => <th key={colName}>{colName}</th>)}
                    {!hideActions && !!actions.length && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {values.map((row, index) => (
                    <tr key={index}>
                        {header.map(colName => {
                            const value = colName in cellRenderers
                                ? cellRenderers[colName]?.({item: row, index, column: colName})
                                : row[colName];

                            return (
                                <td
                                    key={!keyExtractor ? colName : (typeof keyExtractor === 'string' ? row[keyExtractor] : keyExtractor(row))}
                                    className={isNaN(value as any) ? undefined : 'text-end'}
                                >
                                    {value}
                                </td>
                            );
                        })}
                        {!hideActions && !!actions.length && (
                            <td className='gridActions'>
                                {actions.map(({label, action, visible}) => {
                                    if (visible === false || (typeof visible === 'function' && !visible(row)))
                                        return null;

                                    return (
                                        <button key={label} onClick={() => action(row)}>
                                            {label}
                                        </button>
                                    );
                                })}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Grid;
