import {useState, useEffect} from 'react';

function useDrop(props) {
    const {defaultOpen, disabled, onDropVisibleChange} = props;
    const [open, setOpen] = useState(defaultOpen);

    useEffect(() => {
        onDropVisibleChange(open);
    }, [open]);

    const onClick = () => {
        if (disabled) {
            return;
        }

        setOpen(!open);
    };

    const onMouseOut = () => {
        // setOpen(false);
    };

    const onMouseOver = () => {
        /* if (!open) {
            setOpen(true);
        } */
    };

    return {
        open,
        setOpen,
        onClick,
        onMouseOut,
        onMouseOver
    };
}

export default useDrop;