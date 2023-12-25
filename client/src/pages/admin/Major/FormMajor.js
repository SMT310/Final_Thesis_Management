import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import majorService from '../../../services/majorService';
import ToastMessage from '../../../components/ToastMessage/ToastMessage';
import userService from '../../../services/userServices'

export default function FormMajor({ handleClose, id, type }) {
    const [message, setMessage] = React.useState('');
    const [typeMessage, setTypeMessage] = React.useState('');
    const [major, setMajor] = React.useState({});
    const [name, setName] = React.useState('');
    const [heads, setHeads] = React.useState('');
    const [selectedHeadId, setSelectedHeadId] = React.useState({});
    const [openMenu, setOpenMenu] = React.useState(false);

    React.useEffect(() => {
        async function fetchData() {
            const major = await majorService.getMajorById(id);
            const heads = await userService.getAllFaculty();
            setMajor(major);
            setHeads(heads);
            if (type === 'edit') {
                setName(major.name);
                setSelectedHeadId(major.head)
            }
        }
        fetchData();
    }, [])
    const handleOpenMenu = () => {
        setOpenMenu(true);
    };
    const handleCloseMenu = () => {
        setOpenMenu(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            head: selectedHeadId
        };
        if (type === 'create') {
            const respone = await majorService.createMajor(data);
            // call api to create new user
            if (respone.status === 201) {
                setMessage('Tạo major thành công');
                setTypeMessage('success');
                setName('');
                setSelectedHeadId(null);
            } else {
                setMessage('Tạo major thất bại');
                setTypeMessage('error');
            }
        }
        else {
            const respone = await majorService.updateMajor(id, data);
            if (respone.status === 200) {
                setMessage('Update major thành công');
                setTypeMessage('success');

            } else {
                setMessage('Update major thất bại');
                setTypeMessage('error');
            }
        }
        setTimeout(() => {
            setMessage('');
            setTypeMessage('');
            handleClose();
        }, 1500);
    }


    return (
        <React.Fragment>
            <Dialog open={true} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle sx={{ backgroundColor: '#dccaca' }}>{type === 'create' ? 'Add New Major' : 'Update Major'}</DialogTitle>
                    <DialogContent sx={{ width: "600px", backgroundColor: '#dccaca' }}>
                        <ToastMessage message={message} type={typeMessage} />

                        <Box>
                            <TextField
                                label="Name"
                                required
                                value={name}
                                variant="outlined"
                                placeholder="Enter Name"
                                sx={{ width: '100%', mb: 2, mt: 2 }}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />
                        </Box>
                        {heads.length > 0 && (
                            <FormControl sx={{ minWidth: '50%', mt: 1 }}>
                                <InputLabel
                                    id="demo-controlled-open-select-label"

                                >
                                    Select Head of Major
                                </InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={openMenu}
                                    onClose={handleCloseMenu}
                                    onOpen={handleOpenMenu}
                                    value={selectedHeadId}
                                    label="Select Head of Major"
                                    onChange={(e) => setSelectedHeadId(e.target.value)}

                                >
                                    {heads.map((head) => (
                                        <MenuItem key={head._id} value={head._id}>
                                            {head.firstName + ' ' + head.lastName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: '#dccaca' }}>
                        <Button onClick={handleClose}>Cancel</Button>
                        {
                            type === 'create' ?
                                (<Button type='submit'>Add</Button>) :
                                (<Button type='submit'>Update</Button>)
                        }
                    </DialogActions>
                </form>
            </Dialog>

        </React.Fragment>
    );
}