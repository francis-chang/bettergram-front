import styled from "styled-components";

export const SettingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #e0e5eb;
    user-select: none;
`;

export const SettingsItem = styled.div`
    padding: 0.5rem 1rem;
    font-size: 1.3rem;
`;

export const SettingsTitle = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0e5eb;
`;

export const SettingsTitleTitle = styled.div`
    padding: 1rem;
    font-size: 1.5rem;
`;

export const SettingsExit = styled.div`
    padding: 0.65rem 1rem;
    font-size: 1.9rem;
    cursor: pointer;
    transition-duration: 300ms;
    &:hover {
        transform: rotate(90deg);
        color: #f94545;
    }
`;
