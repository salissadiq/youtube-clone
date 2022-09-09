import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import API from "../utils/API"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const dispatch = useDispatch()
  const handleSetFormData = (event) => {
    const {name, value} = event.target
    setFormData(prevFormData => (
      {
        ...prevFormData,
        [name]: value,
      }
    ))
  }

  const handleLogin = async(e)=> {
    e.preventDefault()
    dispatch(loginStart())
    try{
      const response = await API.post('/auth/signin', {email: formData.email, password: formData.password})
      dispatch(loginSuccess(response.data))
    } catch(err) {
      dispatch(loginFailure())
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>
        <Input placeholder="Email" name="email" onChange={handleSetFormData} />
        <Input type="password" name="password" placeholder="password" onChange={handleSetFormData} />
        <Button type="submit" onClick={handleLogin} >Sign in</Button>
        <Title>or</Title>
        <Input placeholder="Name" name="name" onChange={handleSetFormData} />
        <Input placeholder="email" name="email" onChange={handleSetFormData}/>
        <Input type="password" name="password" placeholder="password" onChange={handleSetFormData} />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
