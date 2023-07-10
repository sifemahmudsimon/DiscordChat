import React, { useState, useEffect } from 'react'
import './discordChat.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faHashtag, faVolumeHigh, faCircleUser, faMicrophoneSlash, faMicrophone, faHeadphones, faRss, faPhoneSlash } from '@fortawesome/free-solid-svg-icons'

import Leave from './assets/discord-leave.mp3';
import Join from './assets/discord-join.mp3';

import { Channels } from './data/Data';

const DiscordChat = ({ data }) => {

    const Icon = (icon) => {
        return <FontAwesomeIcon icon={icon} />;
    }

    const updatedData = Channels.Channel;

    const [selectedItem, setselectedItem] = useState(null)
    const [showVoiceChannel, SetShowVoiceChannel] = useState(true)
    const [showTextChannel, SetShowTextChannel] = useState(true)
    const [isVoiceConnected, setIsVoiceConnected] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [isDefan, setIsDefan] = useState(false);

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const playAudio = () => {
        setIsAudioPlaying(true);
    };

    const playingAudio = (sound) => {
        let audio;
        audio = new Audio(sound);
        audio.play()
            .then(() => {
                // Playback started successfully
            })
            .catch((error) => {
                console.log('Audio playback error:', error);
            });

        audio.onended = () => {
            setIsAudioPlaying(false);
        };
        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }

    useEffect(() => {
        if (isAudioPlaying) {
            if (isVoiceConnected === false) {
                playingAudio(Leave)                
            } else if (isVoiceConnected === true) {
                playingAudio(Join)
            }

        }
    }, [isAudioPlaying, isVoiceConnected]);

   
    const handleClick = (index) => {
        setselectedItem(index)
        setIsVoiceConnected(true);
        playAudio();
    }
    const endCall = () => {
        setselectedItem('null')
        setIsVoiceConnected(false);
        playAudio();
    }

    const toggleDefan = () => {
        setIsDefan(!isDefan);
        if (isMute === false) {
            setIsMute(!isMute);
        }

    }
    const toggleMute = () => {
        if (isDefan === true) {
            setIsDefan(false);
        }
        setIsMute(!isMute);
    }


    const toggleChannel = (event) => {
        const { className } = event.target.closest('div')
        if (className === 'voicebody') {
            SetShowVoiceChannel(!showVoiceChannel)
        } else {
            SetShowTextChannel(!showTextChannel)
        }
    }

    return (
        <div className="discordchat">
            <div className="header"><h3>Discord ChatBox</h3></div>

            <div className="body">
                <div className="textbody">

                    <h5 onClick={toggleChannel}>{Icon(faAngleRight)} TEXT CHANNEL</h5>
                    {showTextChannel && (
                        <ul>
                            {updatedData.map((DataType, index) => {
                                if (DataType.type === 'Text') {
                                    return (
                                        <li key={index} >
                                            <div className="subheading">
                                                <div className="icon">
                                                    {Icon(faHashtag)}
                                                </div>
                                                <div className="heading"><span>{DataType.name}</span></div>
                                                <div className="voicestatus">
                                                    {DataType.notificaton !== 0 && (
                                                        <div className="numbernotification">
                                                            <span>{DataType.notificaton}</span>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        </li>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </ul>
                    )}
                </div>
                <div className="voicebody">

                    <h5 onClick={toggleChannel}><span>{Icon(faAngleRight)} VOICE CHANNEL</span></h5>
                    {showVoiceChannel && (
                        <ul>
                            {updatedData.map((dataType, index) => {
                                if (dataType.type === 'Voice') {
                                    return (
                                        <li key={index}
                                            onClick={() => handleClick(index)}
                                            className={selectedItem === index ? 'active' : ''}
                                        >
                                            <div className="select">
                                                <div className='subheading' >
                                                    <div className="icon">
                                                        {Icon(faVolumeHigh)}
                                                    </div>
                                                    <div className="heading"><span> {dataType.name}</span></div>
                                                </div>
                                            </div>



                                            {selectedItem === index && (
                                                <div className="user">
                                                    <ul>
                                                        <li>
                                                            <div className='subheading'>
                                                                <div className="icon">
                                                                    {Icon(faCircleUser)}
                                                                </div>
                                                                <div className="heading"><span> Lucifer</span></div>
                                                                <div className="voicestatus">
                                                                    <div className="iconrow">
                                                                        {isMute && (
                                                                            <div className="icons">{Icon(faMicrophoneSlash)} </div>
                                                                        )}
                                                                        {isDefan && (
                                                                            <div className="icons">{Icon(faHeadphones)}</div>
                                                                        )}

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    );
                                } else {
                                    return null;
                                }
                            })}



                        </ul>
                    )}

                </div>
            </div>
            <div className='footer'>
                <div className="footerbody">
                    {isVoiceConnected && (
                        <div className="connectionstatus">
                            <div className='subheading'>
                                <div className="icon">
                                    {Icon(faRss)}
                                </div>
                                <div className="heading"><span>Voice Connected</span></div>
                                <div className="voicestatus">
                                    <div className="iconrow">
                                        <div className="icons" onClick={endCall} style={{ color: '#ff4545' }}>{Icon(faPhoneSlash)} </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                    <div className="userbar">
                        <div className='subheading'>
                            <div className="icon">
                                {Icon(faCircleUser)}
                            </div>
                            <div className="heading"><span>Lucifer</span></div>
                            <div className="voicestatus">
                                <div className="iconrow">
                                    <div className="icons" onClick={toggleMute}>{Icon(faMicrophone)} </div>
                                    <div className="icons" onClick={toggleDefan}>{Icon(faHeadphones)}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscordChat