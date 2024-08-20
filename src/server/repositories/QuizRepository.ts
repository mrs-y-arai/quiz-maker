import { supabaseServer } from '~/lib/supabase/supabaseServer';
import { SUPABASE_ERROR_CODE } from '~/constants/supabaseErrorCode';

export const QuizRepository = () => {
  const findById = async (id: number) => {
    const { data, error } = await supabaseServer
      .from('quizzes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === SUPABASE_ERROR_CODE.NO_DATA) {
        return null;
      }
      throw new Error(error.message);
    }

    return data;
  };

  const findAll = async () => {
    const { data, error } = await supabaseServer.from('quizzes').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return {
    findById,
    findAll,
  };
};
