import React from 'react';
import { Button } from '../../../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

interface CommerceIntroCardProps {
    onClose: () => void;
}

enum RoutesEnum {
    TORGASHI = '/tovaroveds'
}

const CommerceIntroCard: React.FC<CommerceIntroCardProps> = ({ onClose }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        localStorage.setItem('fromGame', 'true');
        navigate(RoutesEnum.TORGASHI);
    };

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 3,
        }}>
            <div style={{
                background: 'linear-gradient(to right, #4DE4F21A, #4DE4F205)',
                backdropFilter: "blur(50px)",
                borderRadius: '20px',
                border: '1px solid #4DE4F2',
                width: '622px',
                height: '421px',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '40px',
            }}>
                <h2 style={{
                    fontFamily: 'AA Spaceman',
                    color: '#ffffff',
                    marginTop: '0',
                    marginBottom: '15px',
                    fontSize: '32px',
                    marginLeft: '62px',
                    textAlign: 'left',
                }}>
                    Товары
                </h2>

                <div style={{
                    width: '500px',
                    height: '1px',
                    background: '#4DE4F2',
                    marginBottom: '30px',
                    marginLeft: '62px',
                }}></div>

                <div style={{
                    fontFamily: 'Cruinn',
                    fontSize: '20px',
                    fontWeight: '500',
                    textAlign: 'start',
                    color: '#ffffff',
                    margin: '0 48px 0 62px',
                    paddingTop: '10px',
                }}>
                    <p style={{ marginBottom: '20px' }}>Каждый отдел в магазине имеет своё назначение: в одном хранятся молочные продукты, в другом – свежая рыба. Но вот беда – все товары перемешались!</p>
                    <p style={{ marginBottom: '20px' }}>Помогите разложить их по своим местам, чтобы супермаркет заработал как часы!</p>
                    <p style={{ fontStyle: 'italic', marginBottom: '0' }}>P.S.: не все товары будут использованы вами.</p>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '40px',
                    marginTop: '50px',
                }}>
                    <div>
                        <Button
                            bgColor="pink"
                            type="type1v2"
                            onClick={handleBackClick}
                            style={{
                                fontSize: '18px',
                                padding: '12px 25px',
                                textTransform: 'uppercase'
                            }}
                        >
                            Назад
                        </Button>
                    </div>

                    <div>
                        <Button
                            bgColor="blue"
                            type="type1v2"
                            onClick={onClose}
                            style={{
                                fontSize: '18px',
                                padding: '12px 25px',
                                boxShadow: '0 0 10px rgba(0, 200, 215, 0.8)'
                            }}
                        >
                            Вперед
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommerceIntroCard;