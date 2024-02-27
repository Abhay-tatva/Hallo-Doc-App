import React, {useState} from 'react';
import {Button} from '../../Button/ButtonInput';
import {
  Box,
  Container,
  Paper,
  TableSortLabel,
  Typography,
} from '@mui/material';
import Header from '../../Header/Header';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from '@mui/material';
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import './viewUpload.css';
import {useNavigate} from 'react-router-dom';
// import { FormInput } from "../../TextField/FormInput";

const rows = [
  {id: 1, document: 'Document 1', uploadDate: '2024-02-20'},
  {id: 2, document: 'Document 2', uploadDate: '2024-02-21'},
  {id: 3, document: 'Document 3', uploadDate: '2024-02-22'},
];

const ViewUpload = () => {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('uploadDate');
  const navigate = useNavigate();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc' ?
      (a, b) => descendingComparator(a[orderBy], b[orderBy]) :
      (a, b) => -descendingComparator(a[orderBy], b[orderBy]);
  };

  const descendingComparator = (a, b) => {
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const [selectedFile, setSelectedFile] = useState([]);

  // console.log(selectedFile);
  // }

  const handleFileChange = (event) => {
    console.log('event', event.target.files);
    event.preventDefault();
    setSelectedFile(event.target.files);
  };

  const handleUpload = () => {
    // Handle the upload functionality here with the selected file
    if (selectedFile) {
      for (let i = 0; i < selectedFile.length; i++) {
        const newFile = {
          id: rows.length + 1,
          document: selectedFile[i].name,
          uploadDate: new Date().toISOString().split('T')[0],
        };
        console.log('New file', newFile);
        rows.push(newFile);
      }
      setSelectedFile(null); // Reset selected file after upload
    }
  };

  const handleDownload = (document) => {
    console.log('downloading document:', document);
  };

  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    rows.length = 0;
    Array.prototype.push.apply(rows, updatedRows);
    setSelected(selected.filter((selectedId) => selectedId !== id));
  };

  const handleDeleteAll = () => {
    const updatedRows = rows.filter((row) => !selected.includes(row.id));
    rows.length = 0;
    Array.prototype.push.apply(rows, updatedRows);
    setSelected([]);
  };

  const handleDownloadAll = () => {
    console.log('downloading All document:', document);

    selected.forEach((id) => {
      const file = rows.find((row) => row.id === id);
      if (file) {
        handleDownload(file.document);
      }
    });
  };

  // const handleSendMail = () => {
  //   console.log("Sending mail...");
  // };
  return (
    <>
      <Header />
      <Box className="upload-main-container">
        <Container maxWidth="lg" className="upload-main-wrapper">
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            flexWrap="wrap"
          >
            <Box display="flex" flexWrap="wrap">
              <Typography variant="h5" gutterBottom>
                <b>Documents</b>
              </Typography>
            </Box>
            <Button
              name="Back"
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIosNewOutlinedIcon />}
              color="primary"
              onClick={() => navigate(-1)}
              className="back-btn"
            />
          </Box>
          <Paper className="upload-container">
            <Typography variant="caption">Patient Name</Typography>
            <Typography variant="h6">
              <b className="patient-name">Bhoomi Prajapati</b>{' '}
              (MD101819PRBH0005)
            </Typography>
            <Typography variant="body2" marginTop="10px">
              Check here to review and add files that you or the Client/Member
              has attached to the Request.
            </Typography>

            <form>
              <Box position="relative" mb={2} mt={2}>
                <Box display="flex">
                  {/* <Box position="absolute" className="file-select">
                    <label htmlFor="selectfile">Select Files</label>
                  </Box> */}

                  {/* <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    className="upload-content"
                  > */}
                  <Button
                    fullWidth
                    variant="outlined"
                    component="label"
                    className="upload-btn"
                    title="Upload-files"
                  >
                    <input
                      // accept="image/*"
                      onChange={handleFileChange}
                      multiple
                      type="file"
                    />
                  </Button>
                  {/* </Stack> */}

                  {/* <FormInput
                    type="file"
                    id="selectfile"
                    fullWidth
                    inputProps={{
                      multiple: true,
                    }}
                    className="file-input"
                    onChange={handleFileChange}
                  /> */}

                  <Button
                    name="Upload"
                    variant="contained"
                    size="large"
                    startIcon={<CloudUploadOutlinedIcon />}
                    onClick={handleUpload}
                  />
                </Box>
              </Box>
            </form>
            <Box
              display="flex"
              justifyContent="space-between"
              mb={2}
              flexWrap="wrap"
            >
              <Box display="flex" flexWrap="wrap">
                <Typography variant="h6" gutterBottom>
                  <b>Documents</b>
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Button
                  name="Download All"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleDownloadAll('all')}
                />
                <Button
                  name="Delete All"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleDeleteAll('all')}
                />
                <Button name="Send Mail" variant="outlined" color="primary" />
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          selected.length > 0 && selected.length < rows.length
                        }
                        checked={selected.length === rows.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell className="document-cl">Documents</TableCell>
                    <TableCell className="date-cl">
                      <TableSortLabel
                        active={orderBy === 'uploadDate'}
                        direction={order}
                        onClick={() => handleRequestSort('uploadDate')}
                      >
                        Upload Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy)).map(
                      (row) => (
                        <TableRow key={row.id} hover>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isSelected(row.id)}
                              onClick={(event) => handleClick(event, row.id)}
                            />
                          </TableCell>
                          <TableCell>{row.document}</TableCell>
                          <TableCell>{row.uploadDate}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              onClick={() => handleDownload(row.document)}
                            >
                              <CloudDownloadOutlinedIcon />
                            </Button>
                          &nbsp;
                            <Button
                              variant="outlined"
                              onClick={() => handleDelete(row.id)}
                            >
                              <DeleteOutlinedIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ViewUpload;
