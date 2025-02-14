

import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import BulkUpload from './BulkUploadQuestion';
import { BULK_QUESTION_UPLOAD } from '@/services/InterviewMutation';

const mocks = [
  {
    request: {
      query: BULK_QUESTION_UPLOAD,
      variables: { objects: [] }, 
    },
    result: {
      data: {
        insert_questions: {
          affected_rows: 1, 
        },
      },
    },
  },
];

describe('BulkUpload Component', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BulkUpload />
      </MockedProvider>
    );

    expect(screen.getByText('Upload Excel File')).toBeInTheDocument();
  });

});
