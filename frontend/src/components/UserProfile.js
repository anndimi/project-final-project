import React, { useEffect, useState } from "react";
import user from "../reducers/user";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
// import styled from "styled-components";
import linkedinIcon from "../assets/icons/linkedin-icon.png";
import githubIcon from "../assets/icons/github-icon.png";
import { EditProfile } from "./EditProfile";
import { UploadImg } from "./UploadImg";
import { MyAdds } from "./MyAdds";
import { API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import DeleteUser from "./elements/DeleteUser";
import dummyUser from "../assets/icons/dummy-user.png";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UserBg from "../assets/images/user-bg.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Typography, Divider } from "@mui/material";
//Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import { UpArrow } from "./elements/UpArrow";

const StyledUserImage = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${UserBg});
  height: 350px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const UserProfile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const name = useSelector((store) => store.user.name);
  const email = useSelector((store) => store.user.email);
  const location = useSelector((store) => store.user.location);
  const userBio = useSelector((store) => store.user.bio);
  const linkedIn = useSelector((store) => store.user.linkedIn);
  const gitHub = useSelector((store) => store.user.github);
  const created = useSelector((store) => store.user.created);
  const image = useSelector((store) => store.user.image);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditModalActive, setEditModalActive] = useState(false);
  const [isImageModalActive, setImageModalActive] = useState(false);
  const [myImage, setMyImage] = useState("");
  const { id } = useParams();
  console.log(id, "id");
  console.log(accessToken, "accesstoken");

  const toggleEditModal = () => {
    setEditModalActive(!isEditModalActive);
  };

  const toggleImageModal = () => {
    setImageModalActive(!isImageModalActive);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/signup");
    }
  }, [accessToken, navigate]);

  const onButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
  };

  const matches = useMediaQuery((theme) => theme.breakpoints.up("tablet"));

  const createData = (key, value) => {
    return { key, value };
  };

  const rows = [
    createData("Username", username),
    createData("Fullname", name),
    createData("Email", email),
    createData("Location", location),
    createData("Bio", userBio),
  ];

  return (
    <>
      <Box>
        <StyledUserImage />
        <Box
          sx={{ display: "flex", justifyContent: "space-between", margin: 2 }}
        ></Box>
        <Box sx={{ display: "flex" }}>
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              backgroundPosition: "center",
              // borderStyle: "none",
              border: "solid 5px #faf8f8",
              marginLeft: "10%",
              marginTop: "25px",
              zIndex: 3,
              outline: 0,
            }}
            src={image || dummyUser}
            alt="User Profile image"
            alt="profile"
          />
          <Box sx={{ zIndex: 4, marginLeft: 2 }}>
            <Box sx={{ marginTop: 4 }}>
              <Typography
                sx={{
                  fontFamily: "primary.fontFamily",
                  fontWeight: "700",
                  fontSize: 30,
                  padding: 0,
                  alignSelf: "end",
                  zIndex: 3,
                  color: "white",
                  wordBreak: "break-word",
                }}
              >
                {username}
              </Typography>
              <Typography
                sx={{
                  padding: 0,
                  fontFamily: "primary.fontFamily",
                  color: "white",
                }}
              >
                Member since {moment(created).format("MMMM Do YYYY")}
              </Typography>
            </Box>
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
              <Fab
                onClick={() => {
                  navigate("edit");
                  toggleEditModal();
                }}
                sx={{ height: 50, width: 50 }}
              >
                <EditIcon />
              </Fab>
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => {
                    navigate("edit/image");
                    toggleImageModal();
                  }}
                >
                  <Fab sx={{ height: 50, width: 50 }}>
                    <PhotoCamera />
                  </Fab>
                </IconButton>
              </label>
            </Box>
          </Box>
        </Box>
      </Box>

      <section
        onClick={() => {
          setEditModalActive(false);
          setImageModalActive(false);
          navigate(`/userprofile/${id}`);
        }}
      >
        <EditProfile
          isEditModalActive={isEditModalActive}
          toggleEditModal={toggleEditModal}
          onClose={() => setEditModalActive(false)}
        />
        <UploadImg
          isImageModalActive={isImageModalActive}
          toggleImageModal={toggleImageModal}
          onClose={() => setImageModalActive(false)}
        />
        <Divider variant="middle">
          <Typography sx={{ fontFamily: "secondary.fontFamily", fontSize: 20 }}>
            My information
          </Typography>
        </Divider>
        <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
          <TableContainer component={Paper} sx={{ width: "80%" }}>
            <Table sx={{ minWidth: "650" }} aria-label="simple table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.key}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      fontFamily: "secondary.fontFamily",
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ wordBreak: "break-word" }}
                    >
                      {row.key}
                    </TableCell>

                    <TableCell align="left" sx={{ wordBreak: "break-word" }}>
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
                <TableCell align="left">
                  <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                    <img src={linkedinIcon} alt="linkedin-icon" />
                  </a>
                  <a href={gitHub} target="_blank" rel="noopener noreferrer">
                    <img src={githubIcon} alt="github-icon" />
                  </a>
                </TableCell>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </section>
      <MyAdds />
      <Divider variant="middle">
        <Typography sx={{ fontFamily: "secondary.fontFamily", fontSize: 20 }}>
          Manage account
        </Typography>
      </Divider>
      <Box sx={{ display: "flex", justifyContent: "space-evenly", padding: 4 }}>
        <DeleteUser id={id} />
        <Button
          variant="contained"
          sx={{
            fontFamily: "secondary.fontFamily",
            letterSpacing: 1.3,
            margin: 1,
          }}
          onClick={onButtonClick}
        >
          Sign out
        </Button>
      </Box>
      <UpArrow />
    </>
  );
};
