import './Grid.css';

export interface GridData<T> {
    header: Extract<keyof T, string>[],
    values: T[],
    actions: {
        label: string,
        action: (row: T) => any,
        visible?: boolean | ((row: T) => boolean),
    }[],
}

function Grid<T extends {[key: string]: any}>({data: {header = [], values = [], actions = []}}: {data: GridData<T>}) {
    return (
        <table className='gridTable'>
            <thead>
                <tr>
                    {header.map(colName => <th key={colName}>{colName}</th>)}
                    {!!actions.length && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {values.map((row, index) => (
                    <tr key={index}>
                        {header.map(colName => <td key={colName}>{row[colName]}</td>)}
                        {!!actions.length && (
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
