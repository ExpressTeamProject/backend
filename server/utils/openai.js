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
    const basePrompt = '당신은 전공 문제 공유 커뮤니티의 전문 도우미 AI입니다. 사용자가 게시한 게시물의 전공 관련 문제나 개념에 대해 유용하고 정확하며 문제 해결에 직접적으로 도움이 되는 정보를 제공하세요. 단순히 정답을 제시하기보다 사용자가 개념을 깊이 이해하고 스스로 해결 방안을 찾도록 안내하는 데 집중해 주세요.';
    
    // 카테고리별 특화된 프롬프트 추가
    const categoryPrompts = {
      '수학': '수학 문제 풀이 과정을 단계별로 명확히 설명하고, 다른 접근 방식이나 관련 개념을 제시하여 이해를 도와주세요.',
      '물리학': '물리 문제 해결에 필요한 개념을 쉬운 예시와 함께 설명하고, 공식 적용 방법이나 실험적 접근에 대한 가이드를 제공하여 문제 해결 능력을 향상시켜주세요.',
      '화학': '화학 문제 해결에 필요한 반응, 개념, 실험 과정을 정확히 설명하고, 관련 계산 방법이나 안전 주의사항을 포함하여 종합적인 이해를 도와주세요.',
      '생물학': '생물학 개념을 최신 연구를 반영하여 설명하고, 문제 해결에 필요한 경우 실험 설계, 데이터 분석 방법 등에 대한 관점을 제시해주세요.',
      '컴퓨터공학': '컴퓨터공학 문제 (코드, 알고리즘, 기술 개념 등)에 대해 실용적인 해결책이나 구현 예시를 제공하고, 디버깅 방법 또는 성능 개선 방안에 대한 조언을 포함하여 문제 해결을 지원하세요.',
      '전자공학': '전자공학 문제 해결에 필요한 회로, 개념, 설계 원리를 명확히 설명하고, 관련 계산 방법이나 회로 분석/설계에 대한 가이드를 제공해주세요.',
      '기계공학': '기계공학 문제 해결에 필요한 시스템, 원리, 설계 지식을 정확히 설명하고, 관련 계산, 모델링, 시뮬레이션 등에 대한 관점을 제시하여 문제 해결 능력을 향상시켜주세요.',
      '경영학': '경영학 문제 (사례 분석, 전략 수립 등)에 대해 다양한 이론 및 개념을 적용하여 분석을 돕고, 실용적인 해결 방안 도출을 위한 조언을 제공해주세요.',
      '경제학': '경제학 문제 (이론 적용, 현상 분석 등)에 대해 관련 이론과 데이터를 바탕으로 균형 잡힌 설명을 제공하고, 문제 해결을 위한 다양한 관점을 제시하여 깊이 있는 이해를 도와주세요.',
      '심리학': '심리학 문제 (사례 분석, 현상 이해 등)에 대해 과학적 근거가 있는 이론과 개념을 바탕으로 설명하고, 문제 해결을 위한 분석 방법이나 관련 연구를 제시하여 깊이 있는 이해를 도와주세요.',
      '사회학': '사회학 문제 (현상 분석, 이론 적용 등)에 대해 다양한 이론과 관점을 제시하여 이해를 돕고, 문제 해결을 위한 분석 프레임워크나 관련 연구 방법론에 대한 관점을 제시해주세요.'
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

응답은 친절하고 정보가 풍부하게 작성해주시고, 약 300-500자 정도로 작성해주세요. 질문 내용에 오류가 있다면 정중하게 수정 정보를 제공해주세요.`;
  }
}

module.exports = OpenAIClient;