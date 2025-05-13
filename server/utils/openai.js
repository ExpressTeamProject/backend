// utils/openai.js
const axios = require('axios');

/**
 * OpenAI API 클라이언트
 * 게시글에 대한 AI 응답을 생성하는 기능을 제공합니다.
 */
class OpenAIClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.openai.com/v1';
  }

  /**
   * ChatGPT API를 사용하여 응답을 생성합니다.
   * @param {string} content - 게시글 내용
   * @param {string} title - 게시글 제목
   * @param {string} category - 게시글 카테고리
   * @param {Array} tags - 게시글 태그
   * @returns {Promise<string>} - AI가 생성한 응답
   */
  async generateResponse(content, title, category, tags = []) {
    try {
      // 시스템 프롬프트 생성
      const systemPrompt = this.createSystemPrompt(category);
      
      // 사용자 프롬프트 생성
      const userPrompt = this.createUserPrompt(content, title, category, tags);
      
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: 'gpt-4',  // 또는 gpt-3.5-turbo
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 500,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API 호출 중 오류 발생:', error.response?.data || error.message);
      throw new Error('AI 응답을 생성하는 중 오류가 발생했습니다.');
    }
  }

  /**
   * 카테고리에 따른 시스템 프롬프트를 생성합니다.
   * @param {string} category - 게시글 카테고리
   * @returns {string} - 시스템 프롬프트
   */
  createSystemPrompt(category) {
    const basePrompt = '당신은 지식 커뮤니티의 도우미 AI입니다. 게시글에 대해 유용하고 정확한 정보를 제공하세요.';
    
    // 카테고리별 특화된 프롬프트 추가
    const categoryPrompts = {
      '수학': '수학 문제나 개념에 대해 명확하고 단계적인 설명을 제공하세요.',
      '물리학': '물리 개념을 이해하기 쉽게 설명하고, 가능하면 실생활 예시를 포함하세요.',
      '화학': '화학 반응과 개념을 정확히 설명하고, 안전 주의사항도 필요시 언급하세요.',
      '생물학': '생물학 개념을 최신 연구를 반영하여 설명하세요.',
      '컴퓨터공학': '코드나 기술 개념에 대해 실용적인 조언과 예시를 제공하세요.',
      '전자공학': '전자 회로와 개념에 대해 명확한 설명을 제공하세요.',
      '기계공학': '기계 시스템과 원리에 대한 정확한 정보를 제공하세요.',
      '경영학': '비즈니스 전략과 관리 기법에 대한 실용적인 조언을 제공하세요.',
      '경제학': '경제 이론과 현상에 대한 균형 잡힌 설명을 제공하세요.',
      '심리학': '심리학 이론과 개념을 과학적 근거를 바탕으로 설명하세요.',
      '사회학': '사회 현상과 이론에 대한 다양한 관점을 제공하세요.'
    };

    return `${basePrompt} ${categoryPrompts[category] || ''}`;
  }

  /**
   * 사용자 프롬프트를 생성합니다.
   * @param {string} content - 게시글 내용
   * @param {string} title - 게시글 제목
   * @param {string} category - 게시글 카테고리
   * @param {Array} tags - 게시글 태그
   * @returns {string} - 사용자 프롬프트
   */
  createUserPrompt(content, title, category, tags) {
    return `다음 게시글에 대한 도움이 되는 견해나 추가 정보를 제공해주세요:
    
제목: ${title}
카테고리: ${category}
태그: ${tags.join(', ')}

내용:
${content}

응답은 친절하고 정보가 풍부하게 작성해주시고, 약 300-500자 정도로 작성해주세요. 게시글 내용에 오류가 있다면 정중하게 수정 정보를 제공해주세요.`;
  }
}

module.exports = OpenAIClient;