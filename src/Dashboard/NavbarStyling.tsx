import styled from "styled-components";

export const SettingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #e0e5eb;
    user-select: none;
`;

export const SettingsItem = styled.div`
    padding: 0.5rem 0.7rem;
    font-size: 1.3rem;
    cursor: pointer;
    transition-duration: 250ms;
    &:hover {
    }
`;

export const SettingsItemDelete = styled(SettingsItem)`
    color: #ff7575;
`;

export const SettingsItemVerification = styled(SettingsItem)`
    cursor: default;
    text-align: center;
    font-size: 1rem;
    color: #ffa556;
`;

export const SettingsTitle = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0e5eb;
    align-items: center;
`;

export const SettingsTitleTitle = styled.div`
    padding: 0.7rem;
    font-size: 1.5rem;
`;

export const SettingsExit = styled.div`
    padding: 0.3rem 1rem;
    font-size: 1.9rem;
    cursor: pointer;
    transition-duration: 300ms;
    &:hover {
        transform: rotate(90deg);
        color: #f94545;
    }
`;

export const NavBarInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const NavBarInput = styled.input`
    margin-bottom: 1rem;
    padding: 0.8rem 0.8rem;
    width: 18rem;
    box-sizing: border-box;
    border: none;
    background-color: #202730;
    color: #e0e5eb;
    outline: none;
    box-shadow: 5px 5px 0px rgba(102, 124, 153, 0.7);
    font-size: 1.4rem;
    border-radius: 4px;

    &::placeholder {
        color: #e0e5eb;
    }

    &:focus {
        background-color: #e0e5eb;
        color: #202730;
        transition-duration: 250ms;
        transform: translate(-2px, -2px);
        box-shadow: 9px 9px 0px rgba(102, 124, 153, 0.7);

        &::placeholder {
            color: #202730;
        }
    }
`;

export const NavBarSubmitButton = styled.button`
    border: none;
    outline: none;
    padding: 0.8rem 0.5rem;
    background-color: #202730;
    color: #e0e5eb;
    font-size: 1.5rem;
    width: 11rem;
    border-radius: 4px;
    box-shadow: 5px 5px 0px rgba(102, 124, 153, 0.7);
    cursor: pointer;

    &:hover {
        transition-duration: 200ms;
        transform: translate(-2px, -2px);
        box-shadow: 9px 9px 0px rgba(102, 124, 153, 0.8);
    }

    &:active {
        transition-duration: 100ms;
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0px rgba(102, 124, 153, 0.8);
    }

    @media only screen and (max-width: 700px) {
        padding: 1rem 0.5rem;
    }
`;
