import styled from 'styled-components';

export const SongMeta = styled.a`
  ${({ highlight }) => highlight ? 'font-weight: 600;' : ''}
  grid-area: ${({ area }) => area};
  font-size: 16px;
  line-height: 20px;
  padding: 8px 0;
`;

export const SongButton = styled.button`
  grid-area: ${({ area }) => area};
  font-size: 16px;
  line-height: 20px;
  border: none;
  color: inherit;
  background: transparent;
  padding: 8px 0;
`;

export const SongActions = styled.div`
  grid-area: actions;
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-column-gap: 8px;
  border-radius: 0 3px 3px 0;
  padding: 0 8px;
`;

export const SongWrapper = styled.li`
  position: relative;
  list-style: none;
  display: grid;
  grid-template-columns: 8px auto 8px repeat(4, 1fr) 8px auto 8px auto;
  grid-template-areas: '. pp . title artist genre addedAt . duration . actions';
  grid-column-gap: 8px;
  color: #F77074;

  &::before {
    content: '';
    border-top: .5px solid rgba(255, 255, 255, .7);
    position: absolute;
    bottom: 100%;
    width: 100%;
  }

  &:hover,
  &:focus {
    background-color: #FFFFFF;
    border-radius: 4px;
    
    &::before,
    & + li::before { border-color: transparent; }

    > ${SongActions} {
      background-color: #F77074;
      color: #FFFFFF;
    }
  }
`;
