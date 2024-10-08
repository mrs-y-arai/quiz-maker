import { z, type ZodFormattedError } from 'zod';

export const QUIZ_STATUS_ITEM = {
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
} as const;

export type QuizStatus =
  (typeof QUIZ_STATUS_ITEM)[keyof typeof QUIZ_STATUS_ITEM];

export type QuizFormState = {
  message: string | null;
  isSuccess?: boolean;
  quiz?: {
    id: number;
    title: string;
    isPublished: boolean;
  };
  errors?: ZodFormattedError<
    {
      title: string;
      description: string;
      questions: {
        content: string;
        options: {
          content: string;
          isCorrect: 'on' | null;
        }[];
      }[];
      status: QuizStatus;
    },
    string
  >;
};

export const quizFormSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  description: z.string().min(1, { message: '説明文は必須です' }),
  questions: z
    .object({
      content: z.string().min(1, { message: '問題文は必須です' }),
      options: z
        .array(
          z.object({
            content: z.string().min(1, { message: '選択肢は必須です' }),
            isCorrect: z
              .enum(['true'])
              .nullable()
              .transform((value) => value === 'true'),
          }),
        )
        .superRefine((val, ctx) => {
          const isCorrectCount = val.filter((option) => option.isCorrect);
          if (isCorrectCount.length !== 1) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '正解の選択肢を1つ選択してください',
            });
            return;
          }
        }),
    })
    .array()
    .nonempty({ message: '問題は最低1つ以上必要です' }),
  categoryId: z.number().optional(),
  status: z.nativeEnum(QUIZ_STATUS_ITEM, {
    required_error: 'ステータスは必須です',
  }),
});
