import './Grid.css';

interface Props<T> {
    header: Extract<keyof T, string>[],
    values: T[],
    actions?: {
        label: string,
        action: (row: T) => any,
        visible?: boolean | ((row: T) => boolean),
    }[],
    keyExtractor?: Extract<keyof T, string> | ((item: T) => string),
    hideActions?: boolean,
}

function Grid<T extends {[key: string]: any}>({
    header = [],
    values = [],
    actions = [],
    keyExtractor,
    hideActions,
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
                        {header.map(colName => (
                            <td key={!keyExtractor ? colName : (typeof keyExtractor === 'string' ? row[keyExtractor] : keyExtractor(row))}>
                                {row[colName]}
                            </td>
                        ))}
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
