import React from "react";
import {Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Planet} from "../entities/planet";

interface Props {
    planet?: Planet,
    toggle: () => void,
}

const Inputs: {name: keyof Planet, type: 'text' | 'number' | 'select', options?: []}[] = [
    {
        name: 'name',
        type: 'text',
    },
    {
        name: 'rotation_period',
        type: 'number',
    },
    {
        name: 'orbital_period',
        type: 'number',
    },
    {
        name: 'diameter',
        type: 'number',
    },
    {
        name: 'climate',
        type: 'text',
    },
    {
        name: 'gravity',
        type: 'text',
    },
    {
        name: 'terrain',
        type: 'select',
        options: [],
    },
    {
        name: 'surface_water',
        type: 'number',
    },
];

function PlanetEditModal({planet, toggle}: Props) {
    const [data, setData] = React.useState(planet);

    React.useEffect(() => {
        setData(planet);
    }, [planet]);

    const save = () => {
        if (!data)
            return;

        for (const input of Inputs) {
            if (!data[input.name]) {
                alert('All fields are required');
                return;
            }
        }

        if (Math.random() < 0.5) {
            alert('Error');
            return;
        }

        // only close on success
        alert('Success');
        toggle();
    };

    const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        if (!data)
            return;

        setData({
            ...data,
            [e.target.name]: e.target.value || '',
        });
    };

    return (
        <Modal
            isOpen={!!planet}
            scrollable
            size="lg"
            toggle={toggle}
        >
            <ModalHeader toggle={toggle}>
                Edit planet "{data?.name}"
            </ModalHeader>
            <ModalBody>
                {Inputs.map(config => {
                    const children = config.name === 'terrain' ? (
                        <>
                            <option>{data?.terrain}</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                            <option>Option 4</option>
                            <option>Option 5</option>
                        </>
                    ) : undefined;
                    return (
                        <>
                            <Label for={config.name}>
                                {config.name}
                            </Label>
                            <Input
                                key={config.name}
                                className={'mb-3'}
                                value={data?.[config.name]}
                                id={config.name}
                                children={children}
                                onChange={onChange}
                                invalid={!data?.[config.name]}
                                {...config}
                            />
                        </>
                    );
                })}
            </ModalBody>
            <ModalFooter>
                <Button
                    className={'mr-1'}
                    color="primary"
                    onClick={save}
                >
                    Save
                </Button>
                <Button onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default PlanetEditModal;
