<template>
  <SectionCard title="系统设置" subtitle="平台演示参数与告警策略配置面板" tone="orange">
    <div class="settings-grid">
      <div class="setting-card">
        <span>告警阈值</span>
        <p>高危风险命中 3 次以上立即触发人工复核。</p>
      </div>
      <div class="setting-card">
        <span>攻击模式</span>
        <p>支持单轮、连续多轮与任务队列化模拟执行。</p>
      </div>
      <div class="setting-card">
        <span>报告策略</span>
        <p>自动生成漏洞摘要、链路复盘与防御建议卡片。</p>
      </div>
      <div class="setting-card">
        <span>目标接入</span>
        <p>支持 Chatbot、RAG、Function Calling Agent 与自定义 API。</p>
      </div>
    </div>
  </SectionCard>
</template>

<script setup>
import SectionCard from '../components/SectionCard.vue'
</script>
