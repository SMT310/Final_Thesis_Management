import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import scheduleService from '../../../services/scheduleService';
import ToastMessage from '../../../components/ToastMessage/ToastMessage';


export default function FormSchedule({handleClose, id, type}) {
    const [message, setMessage] = React.useState('');
    const [typeMessage, setTypeMessage] = React.useState('');
    const [schedule, setSchedule] = React.useState({});
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    const navigate = useNavigate();
    React.useEffect(() => {
        async function fetchSchedule() {
            const schedule = await scheduleService.getScheduleById(id);
            setSchedule(schedule);
            if (type === 'edit' ) {
                setName(schedule.name);
                setDescription(schedule.description);
                setStartDate(dayjs(schedule.startDate)); // Convert to Dayjs object
                setEndDate(dayjs(schedule.endDate));
            }
        }
        fetchSchedule();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
        };
        if (type === 'create') {
            const respone = await scheduleService.createSchedule(data);
            // call api to create new user
            if (respone.status === 201) {
                setMessage('Tạo schedule thành công');
                setTypeMessage('success');
                setName('');
                setDescription('');
                setStartDate(null);
                setEndDate(null);
            } else {
                setMessage('Tạo schedule thất bại');
                setTypeMessage('error');
            }
        }
        else {
            const respone = await scheduleService.updateSchedule(id, data);
            if (respone.status === 200) {
                setMessage('Update schedule thành công');
                setTypeMessage('success');
                
            } else {
                setMessage('Update schedule thất bại');
                setTypeMessage('error');
            }
        }
        setTimeout(() => {
            setMessage('');
            setTypeMessage('');
            handleClose();
        }, 3000);
    }


    return (
        <React.Fragment>
        <Dialog open={true} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <DialogTitle sx={{ backgroundColor:'#dccaca'}}>{type === 'create' ?'Add New Schedule':'Update Schedule'}</DialogTitle>
            <DialogContent sx={{ width:"600px" , backgroundColor:'#dccaca'}}>
                <ToastMessage message={message} type={typeMessage} />

                <Box>
                    <TextField
                      label="Name"
                      required
                      value={name}
                      variant="outlined"
                      placeholder="Enter Name"
                      sx={{ width: '100%', mb: 2, mt:2}}
                      onChange={(e) =>
                          setName(e.target.value)
                      }
                    />
                </Box>
                <Box>
                    <TextField
                      label="Description"
                      required
                      value={description}
                      variant="outlined"
                      placeholder="Enter Last Name"
                      sx={{ width: '100%', mb:2 }}
                      onChange={(e) =>
                          setDescription(e.target.value)
                      }
                    />
                </Box>
               
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    label="Select Start Date"
                    value={startDate}
                    onChange={(newDay)=> setStartDate(newDay)}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> 

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    label="Select End Date"
                    value={endDate}
                    onChange={(newDay)=> setEndDate(newDay)}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> 

            </DialogContent>
            <DialogActions sx={{ backgroundColor:'#dccaca'}}>
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