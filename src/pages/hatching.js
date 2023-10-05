import Link from "next/link";
import Image from "next/image";
import DropNav from "./dropnav";
import logo from "/public/logo.png";
import { TextField, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import trash from "/public/trash.svg";
import addfield from "/public/addfield.svg";
import PopupProfil from "./popupprofil";
import Select from "react-select";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Hatching() {
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const [userData, setUserData] = useState([]);
  const [menteeOptions, setMenteeOptions] = useState([]);
  const { data: session } = useSession();
  const [mentorOptions1, setMentorOptions1] = useState([]);
  const [mentorOptions2, setMentorOptions2] = useState([]);
  const [mentor1Value, setMentor1Value] = useState("");
  const [mentor2Value, setMentor2Value] = useState("");

  const [formData, setFormData] = useState({
    team_numb: "",
    team_name: "",
    mentor1_nik: "333",
    mentor1_name: "",
    mentor2_nik: "444",
    mentor2_name: "",
    descp: "",
    mentee: [
      {
        nim: "13132110094",
        name: "Justin Alexander Syahputra",
        email: "13132110094@student.prasetiyamulya.ac.id",
        major: "Business",
        prodi: "Management",
        faculty: "SBE",
      },
      {
        nim: "13112210329",
        name: "Nadya Jessica Sinaga",
        email: "13112210329@student.prasetiyamulya.ac.id",
        major: "Business",
        prodi: "Management",
        faculty: "SBE",
      },
    ],
  });

  console.log(formData);
  useEffect(() => {
    async function fetchListHatching() {
      const params = new URLSearchParams({
        stage: "1",
        mentor1_nik: "111",
        mentor2_nik: "222",
      });
      const response = await fetch(`${API_URL}/hatching/detail?${params}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      const data = await response.json();
      console.log(data);
      if (
        data?.data &&
        data?.data?.hatching &&
        data?.data?.hatching.length > 0
      ) {
        const hatchingData = data?.data?.hatching[0];

        setInputValue(hatchingData.team_numb);
        setInputValue1(hatchingData.team_name);
        setAreaValue(hatchingData.descp);
        setMentor1Value(hatchingData.mentor_1 || "");
        setMentor2Value(hatchingData.mentor_2 || "");

        const initialInputFields = hatchingData?.members?.map((member) => ({
          value: member.name,
          label: member.name,
        }));
        setInputFields(initialInputFields);
        const initialMenteOptions = hatchingData?.members?.map((member) => ({
          value: member.name,
          label: member.name,
        }));
        setMenteeOptions(initialMenteOptions);
      } else {
        console.error("No hatching data found");
      }
    }

    fetchListHatching();
  }, [session]);

  useEffect(() => {
    async function fetchMentorOptions1() {
      const response = await fetch(`${API_URL}/master/mentor?id_role=2`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      const data = await response.json();
      console.log(data);
      if (data?.data?.mentors) {
        const options = data.data.mentors.map((mentor) => ({
          value: mentor.name,
          label: mentor.name,
        }));
        setMentorOptions1(options);
      }
    }

    fetchMentorOptions1();
  }, [session]);

  useEffect(() => {
    async function fetchMentorOptions2() {
      const response = await fetch(`${API_URL}/master/mentor?id_role=3`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      const data = await response.json();
      console.log(data);

      const options = data?.data?.mentors.map((mentor) => ({
        value: mentor.name,
        label: mentor.name,
      }));
      setMentorOptions2(options);
    }

    fetchMentorOptions2();
  }, [session]);

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`${API_URL}/master/user?id_role=4`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      const data = await response.json();
      setUserData(data?.data?.users);
    }

    fetchUserData();
  }, [session]);

  const handleSubmit = async () => {
    const response = await fetch(`${API_URL}/hatching/detail`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify(formData),
    });
    const datapost = await response.json();
    console.log("post", datapost);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { value: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);

    setFormData((prevState) => ({
      ...prevState,
      mentee: values.map((field) => ({ name: field.value })),
    }));
  };

  const handleInputChange = (index, value) => {
    const updatedInputFields = [...inputFields];
    updatedInputFields[index].value = value;
    setInputFields(updatedInputFields);

    setFormData((prevState) => ({
      ...prevState,
      mentee: updatedInputFields.map((field) => ({
        ...prevState.mentee[index],
        name: field.value,
      })),
    }));
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#EEF5FF",
      borderRadius: "5px",
      height: "56px",
    }),
  };

  return (
    <main className="bg-white h-screen w-[1465px] flex">
      <div className="w-[200px] h-full pb-[82px] bg-bluenav fixed rounded-r-2xl place-items-center">
        <div className="mt-7 mb-28 border-b border-white">
          <div className="text-white font-bold text-2xl text-center pb-2.5">
            Hatching <br /> Program
          </div>
        </div>
        <button
          className="text-white font-semibold text-base w-[158px] ml-4 mt-[430px] fixed text-center bg-red py-2.5 rounded-xl"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </button>
        <div className="px-4 grid grid-col space-y-36">
          <div>
            <div className="mb-10">
              <Link
                href="/dashboardadmin"
                className="px-10 text-white font-semibold text-base text-center bg-bluenav py-2.5 rounded-xl"
              >
                Dashboard
              </Link>
            </div>
            <div className="mb-10">
              <DropNav />
            </div>
            <div className="mb-10">
              <Link
                href="/penilaianadmin"
                className="px-12 text-white font-semibold text-base text-center bg-primary hover:bg-bluehover py-2.5 rounded-xl mt-10"
              >
                Penilaian
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white pr-5 ml-[218px]">
        <div className="flex items-center pb-[5px] pt-3 border-b border-primary fixed bg-white mb-9 z-10">
          <div className="flex justify-center gap-3 items-center w-[300px] mr-[870px]">
            <Image alt="logo" src={logo} />
            <div className="col-2">
              <div className="text-primary text-xs font-bold">UNIVERSITAS</div>
              <div className="text-primary text-2xl font-bold">
                PRASETIYA MULYA
              </div>
            </div>
          </div>
          <PopupProfil />
        </div>
      </div>
      <div className="grid col-2 place-items-center mt-[110px] space-y-[30px] w-[1120px]">
        <div className="grid place-items-center space-y-[30px]">
          <div className="flex w-[898px] items-center h-[48px] text-base font-semibold">
            Nomor Kelompok
            <p className="ml-[75px] pr-[38px] space-x-[19px]">:</p>
            <TextField
              name="team_numb"
              className="bg-bluefield h-14 w-[640px]"
              onChange={(event) => {
                const value = event.target.value;
                setInputValue(value);
                setFormData((prevState) => ({
                  ...prevState,
                  team_numb: value,
                }));
              }}
              placeholder="Nomor Kelompok"
              value={inputValue}
            />
          </div>
          <div className="flex w-[898px] items-center h-[48px] text-base font-semibold">
            Nama Kelompok
            <p className="ml-[82px] pr-[38px] space-x-[19px]">:</p>
            <TextField
              name="team-name"
              className="bg-bluefield h-14 w-[640px]"
              onChange={(event) => {
                const value = event.target.value;
                setInputValue1(value);
                setFormData((prevState) => ({
                  ...prevState,
                  team_name: value,
                }));
              }}
              placeholder="Nama Kelompok"
              value={inputValue1}
            />
          </div>
          <div className="flex w-[898px] items-center h-[48px] text-base font-semibold">
            Dosen Pembimbing 1
            <p className="ml-12 pr-[38px] space-x-[19px]">:</p>
            <Select
              name="mentor1_name"
              className="w-[645px]"
              styles={customStyles}
              options={mentorOptions1}
              onChange={(selectedOption) => {
                const value = selectedOption ? selectedOption.value : "";
                setMentor1Value(value);
                setFormData((prevState) => ({
                  ...prevState,
                  mentor1_name: value,
                }));
              }}
              placeholder="Pilih Dosen"
              value={{
                value: mentor1Value,
                label: mentor1Value,
              }}
              isClearable
            />
          </div>

          <div className="flex w-[898px] items-center h-[48px] text-base font-semibold">
            Dosen Pembimbing 2
            <p className="ml-12 pr-[38px] space-x-[19px]">:</p>
            <Select
              name="mentor2_name"
              className="w-[645px]"
              styles={customStyles}
              options={mentorOptions2}
              onChange={(selectedOption) => {
                const value = selectedOption ? selectedOption.value : "";
                setMentor2Value(value);
                setFormData((prevState) => ({
                  ...prevState,
                  mentor2_name: value,
                }));
              }}
              placeholder="Pilih Dosen"
              value={{
                value: mentor2Value,
                label: mentor2Value,
              }}
              isClearable
            />
          </div>
          <div className="flex w-[898px] h-[265px] text-base font-semibold">
            Ringkasan Ide Bisnis
            <p className="ml-[58px] pr-[38px] space-x-[19px]">:</p>
            <div className="h-56 w-[640px]">
              <TextareaAutosize
                name="descp"
                style={{
                  backgroundColor: "#EEF5FF",
                  width: 640,
                  padding: 12,
                  borderRadius: 5,
                }}
                minRows={10}
                placeholder="Ringkasan Ide Bisnis"
                onChange={(event) => {
                  const value = event.target.value;
                  setAreaValue(value);
                  setFormData((prevState) => ({
                    ...prevState,
                    descp: value,
                  }));
                }}
                value={areaValue}
              />
            </div>
          </div>
          <div className="flex w-[1000px] items-start h-30 text-base ml-28 font-semibold">
            Anggota Kelompok
            <p className="ml-[60px] pr-[38px] space-x-[19px]">:</p>
            <div>
              {inputFields?.map((inputField, index) => (
                <div key={index} className="flex items-center gap-4 mb-[19px] ">
                  <Select
                    styles={customStyles}
                    className="w-[640px]"
                    options={userData?.map((user) => ({
                      value: user.name,
                      label: user.name,
                    }))}
                    onChange={(selectedOption) => {
                      const value = selectedOption ? selectedOption.value : "";
                      handleInputChange(index, value);
                    }}
                    placeholder="Pilih Nama Anggota"
                    value={
                      inputField.value
                        ? { value: inputField.value, label: inputField.value }
                        : null
                    }
                    isClearable
                  />
                  <button onClick={() => handleRemoveFields(index)}>
                    <Image src={trash} alt="trash" />
                  </button>
                </div>
              ))}

              <div className="text-center w-[640px]">
                <button onClick={handleAddFields}>
                  <Image src={addfield} alt="addfield" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[1120px] flex place-content-end pr-14 gap-3">
          <Link
            href="/penilaianadmin"
            className="bg-red text-white w-40 h-[42px] rounded-xl grid place-items-center"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white w-40 h-[42px] rounded-xl"
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}
