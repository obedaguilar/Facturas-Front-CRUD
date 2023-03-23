import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';






const ModalHome = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const handleMes = async e => {
        e.preventDefault();
        navigate('/registro/mensual');
    }

    const handleAnual = async e => {
        e.preventDefault();
        navigate('/registro/anual');
    }


    return (
        <div className='lowercase'>
            <Button type="button" onClick={handleOpen} style={{
                textTransform: 'none',
                background: 'none',
                border: 'none',
                margin: '0',
                padding: '0',
                textDecorationLine: 'underline',

            }} >
                únete
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                            <div className='flex justify-center my-4'>
                                <Button type="button" onClick={handleClose} variant="contained">
                                    Cerrar
                                </Button>
                            </div>
                </Box>
            </Modal>
        </div>

    )
}

export default ModalHome