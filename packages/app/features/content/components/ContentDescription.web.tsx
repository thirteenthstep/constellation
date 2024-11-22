import React, {FC} from 'react';

export const ContentDescription: FC<{description: string}> = ({
  description,
}) => {
  return <span dangerouslySetInnerHTML={{__html: description}} />;
};
