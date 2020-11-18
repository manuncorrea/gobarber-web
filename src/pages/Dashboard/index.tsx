import React, { useState } from 'react';

import { 
  Container, 
  Header, 
  HeaderContent, 
  Profile, 
  Content, 
  Schedule, 
  NextAppointment,
  Section,
  Appointment,
  Calendar, 
 } from './styles';

import logoImg from '../../assets/logo.svg';
import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectdDate, setSelectDate] = useState(new Date());

  const { signOut, user } = useAuth();

  return(
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name}/>
            <div>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
            <h1>Horario agendados</h1>
            <p>
              <span>Hoje</span>
              <span>Dia 06</span>
              <span>Segunda-feira</span>
            </p>

            <NextAppointment>
              <strong>Atendimento a seguir</strong>

              <div>
                <img src="https://avatars3.githubusercontent.com/u/15049865?s=460&u=6d58b57ac3c885fe570eb32c1b0a273e72771060&v=4" alt="Manu Correa"/>

                <strong>Manu Correa</strong>

                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </NextAppointment>
            <Section>
              <strong>Manhã</strong>
              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>

                <div>
                  <img src="https://avatars3.githubusercontent.com/u/15049865?s=460&u=6d58b57ac3c885fe570eb32c1b0a273e72771060&v=4" alt="Manu Correa"/>

                  <strong>Manu Correa</strong>

                </div>
              </Appointment>

              <Appointment>
                <span>
                  <FiClock />
                  11:00
                </span>

                <div>
                  <img src="https://avatars3.githubusercontent.com/u/15049865?s=460&u=6d58b57ac3c885fe570eb32c1b0a273e72771060&v=4" alt="Manu Correa"/>

                  <strong>Manu Correa</strong>

                </div>
              </Appointment>
              <strong>Tarde</strong>

              <Appointment>
                <span>
                  <FiClock />
                  14:00
                </span>

                <div>
                  <img src="https://avatars3.githubusercontent.com/u/15049865?s=460&u=6d58b57ac3c885fe570eb32c1b0a273e72771060&v=4" alt="Manu Correa"/>

                  <strong>Manu Correa</strong>

                </div>
              </Appointment>
            </Section>
        </Schedule>
        <Calendar></Calendar>
      </Content>
    </Container>
  );
} 

export default Dashboard; 