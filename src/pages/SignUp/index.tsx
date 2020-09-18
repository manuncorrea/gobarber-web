import React, { useCallback} from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';

import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background} from './styles';

const SignUp: React.FC = () => {
   const handleSubmit = useCallback(async (data: object) => {
        try{
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatorio'),
                email: Yup.string().required('E-mail obrigatorio').email('Digite um e-email valido'),
                password: Yup.string().min(6, 'No minimo 6 digitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
        }catch(err) {
            console.log(err);     
        }
    }, []);
    return(
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                    <Button type="submit">Cadastar</Button>

                </Form>

                <a href="teste">
                    <FiArrowLeft />
                    Voltar para logon
                </a>
            </Content>
        </Container>
    );
}

export default SignUp;