import { makeStyles } from '@material-ui/core/styles';
import { height } from '@mui/system';

const useStyles = makeStyles((theme) => ({
    // home start
    headerContainerHome: {
        minHeight: "100vh",

    },
    profileContainer: {
        minHeight: "70vh",
        background: "#7CFF6B",
        marginTop: "5vh",
        marginBottom: "5vh"
    },
    headerImg: {
        maxWidth: "90%",
    },
    profileImg: {
        maxWidth: "40vh",
        maxHeight: "40vh",
        margin: "10%",
    },
    profileCard: {
        minWidth: "55vw",
        minHeight: "50vh"
    },
    texth1: {
        fontSize: 50,
    },

    // login
    cardLogin: {
        minWidth: 320,
        minHeight: 350,
    },
    containerLogin: {
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #0A8270 20%, #7CFF6B 90%)',
    },
    buttonLogin: {
        background: '#0A8270',
        color: '#ffff',
        borderRadius: '30px',
        minWidth: 100
    },



    // header
    headerContainer: {
        minHeight: "50vh",

    },
    bodyContainer: {
        minHeight: "100vh",
        marginTop: "-10rem",
    },
    headerCard: {
        maxWidth: "95vw",
        minHeight: "40vh",
        minWidth: "95vw",
        background: 'linear-gradient(45deg, #7CFF6B 20%, #0A8270 90%)',
    },
    headerText: {
        color: "white"
    },
    bodyContainerSiswa: {
        marginTop: "-10rem",
        marginBottom: "3rem"
    },

    // table (histori)
    tableBody: {
        maxWidth: "95vw",
    },

    // table spp
    columnId: {
        minWidth: "5vw",
        fontSize: "20px",
        fontWeight: "300",
        fontFamily: "Poppins"
    },
    columnTahun: {
        minWidth: "25vw",
        fontSize: "20px"
    },
    columnNominal: {
        minWidth: "25vw",
        fontSize: "20px"
    },
    columnAksi: {
        minWidth: "5vw",
        fontSize: "20px"
    },
    pagination: {
        fontWeight: "500",
        fontFamily: "Poppins"
    },

    // table kelas
    columnKelas: {
        minWidth: "15vw",
        fontSize: "20px"
    },
    columnKompetensi: {
        minWidth: "25vw",
        fontSize: "20px"
    },

    // card siswa
    bodyCardSiswa: {
        minHeight: "20vh",
        maxHeight: "60vh",
        maxWidth: "95vw",
        marginTop: "2vh",
        marginBottom: "0rem"
    },
    bodyImgSiswa: {
        minWidth: "10rem",
        maxHeight: "10rem",
        borderRadius: 500,
        margin: "2vh"
    },

    // card admin
    bodyCardAdmin: {
        marginTop: "5px",
        minHeight: "50vh",
        maxWidth: "95vw"
    },
    bodyImgAdmin: {
        minWidth: "10rem",
        maxHeight: "10rem",
        borderRadius: 100,
        marginTop: "0vh"
    },

    // button
    button: {
        width: "0px",
        // height: "30px",
        // margin: "5px",
        // top: "0.4rem",
    },
    buttonInfo: {
        // width: "110px",
        // margin: "5px",
        // top: "0.1rem",
    },
    footerContainer: {
        position: "fixed",
        bottom: "3vh",
        right: "3vh",
    },
    footerButton: {
        backgroundColor: "#0275d8",
        '&:hover': {
            backgroundColor: "#292b2c",
        },
    },
    buttonAdd: {
        minHeight: "50vh",
        minWidth: "100%",
        backgroundColor: "#0275d8",
        fontSize: "20px",
        '&:hover': {
            backgroundColor: "#292b2c",
        },
    },

    // modal
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paperHistori: {
        backgroundColor: '#fff',
        border: 'none',
        borderRadius: '10px',
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "40vh",
        maxWidth: "50vw",
    },
    paperModal: {
        backgroundColor: '#fff',
        border: 'none',
        borderRadius: '10px',
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "40vh",
        maxWidth: "50vw",
    },
    paperSpp: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "30vh",
        maxWidth: "50vw",
    },
    paperSiswa: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "40vh",
        maxWidth: "50vw",
    },
    paperKelas: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "30vh",
        maxWidth: "50vw",
    },
    paperAdmin: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        minWidth: "30vw",
        minHeight: "50vh",
        maxWidth: "50vw",
    },
    inputField: {
        minWidth: "100%",
        margin: "5px",
        fontFamily: "Poppins"
    },
    formContainer: {
        margin: "3vh"
    },
    infoContainer: {
        marginLeft: "7vw"
    },
    buttonSave: {
        margin: "2vh",
        backgroundColor: "#0275d8",
        '&:hover': {
            backgroundColor: "#292b2c",
        },
        minWidth: "120px",
        minHeight: "2vh",
        fontSize: "18px",
        borderRadius: "100px"
    },
    inputNone: {
        display: 'none'
    },

    titleModal: {
        fontSize: '24px',
        fontWeight: '600',
    },
    labelModal: {
        fontWeight: '500',
        fontSize: '16px'
    },
    valueModal: {
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '24px'
    },
    labelForm: {
        fontWeight: '600',
        fontFamily: 'Poppins'
    },

    // ROW
    row: {
        display: 'flex'
    }

}))

export { useStyles }